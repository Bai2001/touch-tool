#include <napi.h>
#include <windows.h>

RECT touchRect;
HHOOK hHook = NULL;
Napi::ThreadSafeFunction tsfn;

LRESULT CALLBACK LowLevelMouseProc(int nCode, WPARAM wParam, LPARAM lParam) {
    if (nCode >= 0) {
        MSLLHOOKSTRUCT *pMouse = (MSLLHOOKSTRUCT *)lParam;
        DWORD extra = GetMessageExtraInfo();

        tsfn.BlockingCall([=](Napi::Env env, Napi::Function jsCallback) {
            Napi::Object evt = Napi::Object::New(env);
            evt.Set("x", pMouse->pt.x);
            evt.Set("y", pMouse->pt.y);
            evt.Set("type", (int)wParam);
            jsCallback.Call({ evt });
        });

        if ((extra & 0xFF515700) == 0xFF515700) { // MI_WP_SIGNATURE
            if (pMouse->pt.x >= touchRect.left && pMouse->pt.x < touchRect.right &&
                pMouse->pt.y >= touchRect.top && pMouse->pt.y < touchRect.bottom) {
                return 1; 
            }
        }
    }
    return CallNextHookEx(NULL, nCode, wParam, lParam);
}

DWORD WINAPI HookThread(LPVOID lpParam) {
    hHook = SetWindowsHookEx(WH_MOUSE_LL, LowLevelMouseProc, NULL, 0);
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }
    UnhookWindowsHookEx(hHook);
    return 0;
}

Napi::Value SetTouchScreenRect(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Object obj = info[0].As<Napi::Object>();
    touchRect.left = obj.Get("x").As<Napi::Number>().Int32Value();
    touchRect.top = obj.Get("y").As<Napi::Number>().Int32Value();
    touchRect.right = touchRect.left + obj.Get("width").As<Napi::Number>().Int32Value();
    touchRect.bottom = touchRect.top + obj.Get("height").As<Napi::Number>().Int32Value();
    return env.Undefined();
}

Napi::Value StartHook(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    Napi::Function jsCallback = info[0].As<Napi::Function>();

    tsfn = Napi::ThreadSafeFunction::New(
        env,
        jsCallback,       // JS 回调函数
        "MouseHook",      // 名称
        0,                // 队列大小，0 表示无限
        1                 // 初始线程数量
    );

    CreateThread(NULL, 0, HookThread, NULL, 0, NULL);
    return env.Undefined();
}

Napi::Value StopHook(const Napi::CallbackInfo& info) {
    PostThreadMessage(GetCurrentThreadId(), WM_QUIT, 0, 0);
    return info.Env().Undefined();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("setTouchScreenRect", Napi::Function::New(env, SetTouchScreenRect));
    exports.Set("startHook", Napi::Function::New(env, StartHook));
    exports.Set("stopHook", Napi::Function::New(env, StopHook));
    return exports;
}

NODE_API_MODULE(mouseHook, Init)
