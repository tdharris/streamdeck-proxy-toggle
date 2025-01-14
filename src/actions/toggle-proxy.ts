import { action, KeyUpEvent, SingletonAction, Target, WillAppearEvent } from "@elgato/streamdeck";
import { KeyImage } from "./../modules/key-image";
import { execSync } from "node:child_process";

type ProxySettings = { isEnabled?: boolean };

@action({ UUID: "com.tdharris.proxy-toggle.toggle" })
export class ToggleProxy extends SingletonAction<ProxySettings> {
	override async onWillAppear(ev: WillAppearEvent<ProxySettings>): Promise<void> {
		if (!ev.action.isKey()) return;
		const { settings } = ev.payload;
		if (settings.isEnabled === undefined) {
			const key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
			const output = execSync(`reg query "${key}" /v ProxyEnable`, { encoding: "utf-8" });
			settings.isEnabled = output.includes("0x1");
			await ev.action.setSettings(settings);
		}
		await ev.action.setState(settings?.isEnabled || false ? 1 : 0);
	}

	override async onKeyUp(ev: KeyUpEvent<ProxySettings>): Promise<void> {
		try {
			const { settings } = ev.payload;
			const key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
			const output = execSync(`reg query "${key}" /v ProxyEnable`, { encoding: "utf-8" });
			const isEnabled = output.includes("0x1");
			const newEnabled = !isEnabled;
			execSync(`reg add "${key}" /v ProxyEnable /t REG_DWORD /d ${newEnabled ? 1 : 0} /f`);
			settings.isEnabled = newEnabled;
			await ev.action.setSettings(settings);
			await ev.action.setState(newEnabled ? 1 : 0);
		} catch(e) {
			console.error(e);
			await ev.action.setImage(KeyImage("#ff0000"));
		}
	}
}