# Math IM Switch <img src="https://img.shields.io/github/manifest-json/v/Yang00002/math-im-switch">

**[中文文档](./README_cn.md)**

**This plugin only support Windows x64.**
## Usage
This plugin allow you to change your InputMethod languague when you enter or leave the math environment, making you free from typing extra `Shift`.

Not for those whose first language is English.

## Install

### Download the plugin

You need to download the following files from [repository release page](https://github.com/Yang00002/Math-IM-Switch/releases).

- main.js
- manifest.json
- styles.css

Then go to your Obsidian vault, put the files above into `.obsidian/plugins/math-im-switch`
```
valut_name/
		.obsidian/
				plugins/
						math_im_switch/
									main.js
									manifest.json
									styles.css
						...
				...
		...
```

Now you are able to see the plugin in your obsidian settings.

### Download im-switch.exe

You need to download `im-switch.exe` from [repository release page](https://github.com/Yang00002/Math-IM-Switch/releases). It's a tool to change input method for the plugin.

Sadly `im-switch.exe` is determined to be a virus by Windows Defender. If you are not sure about it's safty, you can build it from source.

### Build im-switch.exe from source

If you want to build `im-switch.exe` from source, you need to clone the [repository](https://github.com/Yang00002/Math-IM-Switch), or simply download source code zip from [repository release page](https://github.com/Yang00002/Math-IM-Switch/releases).

If you have Visual Studio, you can open `src/im_switch/im_switch.sln` as a Visual Studio project. After you running the code, you can find `im-switch.exe` at `src/im_switch/x64/im_switch.exe`.

Otherwise, you need to compile `src/im_switch/im_switch.cpp` using a C or C++ compiler.

### Change Settings

You need to entering Obsidian settings page, setting `IM switch path` to absolute path of `im_switch.exe`.