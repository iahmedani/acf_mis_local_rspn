let builder = require('electron-builder');
let Platform = builder.Platform;

let options = {
    targets: Platform.WINDOWS.createTarget(),
    config: {
      "directories": {
        "output": "dist"
    },
      "nsis": {
        "oneClick": false,
        "perMachine": true,
        "allowToChangeInstallationDirectory": true
      },
      "publish": [
        {
          "provider": "github",
          "owner": "iahmedani",
          "repo": "acf_mis_local"
        }
      ],
      "appId": "com.github.iahmedani.aahmislocalapp",
      "win": {
        "icon": "build/win/logo.ico",
        "target": [
          {
            "target": "nsis",
            "arch": [
              "x64",
              "ia32"
            ]
          }
        ]
      }

    }
  };

  builder
  .build(options)
  .then(()=>{
      console.log('Build OK!')
  })
  .catch((err)=>{
      console.log(err)
  })
