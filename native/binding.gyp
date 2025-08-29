{
  "targets": [
    {
      "target_name": "mouseHook",
      "sources": [ "mouseHook.cpp" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      "dependencies": [
        "<!(node -p \"require('node-addon-api').gyp\")"
      ],
      "product_dir": "../build",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "xcode_settings": { "GCC_ENABLE_CPP_EXCEPTIONS": "YES" },
      "msvs_settings": { 
        "VCCLCompilerTool": { "ExceptionHandling": 1 },
        "VCLinkerTool": {
          "OutputFile": "$(OutDir)\\$(ProjectName).node"
        }
      }
    }
  ]
}