# Math IM Switch <img src="https://img.shields.io/github/manifest-json/v/Yang00002/math-im-switch">

**[English File](./README.md)**

**本插件只支持 Windows x86_64.**
## 用途

本插件可以在公式环境自动切换输入法。默认在进入公式环境时切换为英文，离开时切换为中文。


## 安装

### 下载插件

在[仓库 Release 界面](https://github.com/Yang00002/Math-IM-Switch/releases)下载下面三个文件

- main.js
- manifest.json
- styles.css

然后把它们放到你 Obsidian 仓库 `.obsidian/plugins/math-im-switch` 文件夹里。
你可以得到下图的文件结构：
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

然后就能在 Obsidian 的设置界面看到这个插件。

### 下载 im-switch.exe

你需要在[仓库 Release 界面](https://github.com/Yang00002/Math-IM-Switch/releases)下载 `im-switch.exe`. 因为插件本身没有办法自己切换输入法，这个是帮助插件切换输入法的。

`im-switch.exe` 在我最近的测试中被 Windows Defender 报毒了，如果你不确定它是不是安全的，可以自己从源代码构建它。

### 从源代码构建 im-switch.exe

你需要先 clone [源代码仓库](https://github.com/Yang00002/Math-IM-Switch), 或者直接在[仓库 Release 界面](https://github.com/Yang00002/Math-IM-Switch/releases)下载源代码的压缩包.

如果你有 Visual Studio，你可以打开 `src/im_switch/im_switch.sln`，这是一个 VS 的项目。运行项目后你可以在 `src/im_switch/x64/im_switch.exe` 找到生成的文件.

如果没有 Visual Studio，就需要用 C 或者 C++ 编译器编译 `src/im_switch/im_switch.cpp`。

### 更改设置

在插件设置里有一个 `IM switch path` 选项，更改为 `im_switch.exe` 的绝对路径。