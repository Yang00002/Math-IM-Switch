import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {
	ViewUpdate,
	EditorView,
	ViewPlugin,
} from '@codemirror/view';
import { syntaxTree } from "@codemirror/language";
import { promisify } from 'util';
import { exec } from 'child_process';

interface MIMSPluginSettings {
	path: string;
	getPara: number;
	setPara: number;
	mathCode: number;
	textCode: number;
}

const DEFAULT_SETTINGS: MIMSPluginSettings = {
	path: 'C:\\Users\\Public\\Downloads\\im-switch.exe',
	getPara: 1,
	setPara: 2,
	mathCode: 0,
	textCode: 1025
}

export default class MIMSPlugin extends Plugin {
	settings: MIMSPluginSettings;

	async onload() {

		await this.loadSettings();

		this.addSettingTab(new MIMSSettingTab(this.app, this));

		this.registerEditorExtension(ViewPlugin.fromClass(createExtension(this.settings)));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}


function createExtension(settings: MIMSPluginSettings) {
	return class {
		isinmath: boolean;
		textPath: string = settings.path + " " + settings.getPara + " " + settings.setPara + " " + settings.textCode;
		mathPath: string = settings.path + " " + settings.getPara + " " + settings.setPara + " " + settings.mathCode;
		constructor(view: EditorView) {
			this.isinmath = isInMath(view);
			this.switIM();
		}

		update(update: ViewUpdate) {
			if (update.docChanged || update.selectionSet) {
				const s2 = isInMath(update.view);
				if (this.isinmath != s2) {
					this.isinmath = s2;
					this.switIM();
				}
			}
		}

		private switIM(): void {
			if (this.isinmath) {
				this.toMathIM();
			}
			else {
				this.toTextIM();
			}
		}

		private async toTextIM() {
			const output = await promisify(exec)(this.textPath);
			return output.stdout;
		}

		private async toMathIM() {
			const output = await promisify(exec)(this.mathPath);
			return output.stdout;
		}
	};
}

function isInMath(view: EditorView): boolean {
	const state = view.state;
	const pos = state.selection.main.to;
	const tree = syntaxTree(state);
	let syntaxNode = tree.resolveInner(pos, -1);
	if (syntaxNode.name.contains("math-end")) return false;

	if (!syntaxNode.parent) {
		syntaxNode = tree.resolveInner(pos, 1);
		if (syntaxNode.name.contains("math-begin")) return false;
	}

	// Account/allow for being on an empty line in a equation
	if (!syntaxNode.parent) {
		const left = tree.resolveInner(pos - 1, -1);
		const right = tree.resolveInner(pos + 1, 1);

		return (left.name.contains("math") && right.name.contains("math") && !(left.name.contains("math-end")));
	}

	return (syntaxNode.name.contains("math"));
}

function strLegalPath(str: string | null | undefined, defaultString: string): string {
	return (str === null || str === undefined || str.trim().length === 0) ? defaultString : str;
}
function strLegalInt(str: string | null | undefined, defaultNumber: number): number {
	if (str === null || str === undefined || str.trim().length === 0) return defaultNumber;
	const n = Number(str);
	if (Number.isNaN(n)) return defaultNumber;
	return n;
}

class MIMSSettingTab extends PluginSettingTab {
	plugin: MIMSPlugin;

	constructor(app: App, plugin: MIMSPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('IM switch path')
			.setDesc('Path of input method switch program. You need to provide it as the plugin itself can not select input method. Require Absolute path. Restart the plungin to apply the change.')
			.addText(text => text
				.setPlaceholder('path')
				.setValue(this.plugin.settings.path)
				.onChange(async (value) => {
					this.plugin.settings.path = strLegalPath(value, DEFAULT_SETTINGS.path);
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('GetParameter Code')
			.setDesc('The code to get current language from your input method. Set 1 for Microsoft Input Method. Restart the plungin to apply the change.')
			.addText(text => text
				.setPlaceholder('code value')
				.setValue(this.plugin.settings.getPara.toString())
				.onChange(async (value) => {
					this.plugin.settings.getPara = strLegalInt(value, DEFAULT_SETTINGS.getPara);
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('SetParameter Code')
			.setDesc('The code to set current language from your input method. Set 2 for Microsoft Input Method. Set 6 if not work(If you set corret IM switch path before). Restart the plungin to apply the change.')
			.addText(text => text
				.setPlaceholder('code value')
				.setValue(this.plugin.settings.setPara.toString())
				.onChange(async (value) => {
					this.plugin.settings.setPara = strLegalInt(value, DEFAULT_SETTINGS.setPara);
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('Math Language Code')
			.setDesc('The code of language in math equations. Set 0 for English, set 1025 for Chinese. Restart the plungin to apply the change.')
			.addText(text => text
				.setPlaceholder('lauguage code value')
				.setValue(this.plugin.settings.mathCode.toString())
				.onChange(async (value) => {
					this.plugin.settings.mathCode = strLegalInt(value, DEFAULT_SETTINGS.mathCode);
					await this.plugin.saveSettings();
				}));
		new Setting(containerEl)
			.setName('Text Language Code')
			.setDesc('The code of language in common texts. Set 0 for English, set 1025 for Chinese. Restart the plungin to apply the change.')
			.addText(text => text
				.setPlaceholder('lauguage code value')
				.setValue(this.plugin.settings.textCode.toString())
				.onChange(async (value) => {
					this.plugin.settings.textCode = strLegalInt(value, DEFAULT_SETTINGS.textCode);
					await this.plugin.saveSettings();
				}));
	}
}
