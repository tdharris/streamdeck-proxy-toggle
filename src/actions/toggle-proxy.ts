import { action, KeyDownEvent, SingletonAction, Target, WillAppearEvent } from "@elgato/streamdeck";
import { KeyImage } from "./../modules/key-image";
import { execSync } from "node:child_process";

@action({ UUID: "com.tdharris.proxy-toggle.toggle" })
export class ToggleProxy extends SingletonAction {
	override async onWillAppear(ev: WillAppearEvent): Promise<void> {
		if (!ev.action.isKey()) return;
		// If we don't have a title key already, set it
		return ev.action.setState(0);
	}

	override async onKeyDown(ev: KeyDownEvent): Promise<void> {
		try {
			const key = "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings";
			const output = execSync(`reg query "${key}" /v ProxyEnable`, { encoding: "utf-8" });
			// Current "ProxyEnable" (1 = ON, 0 = OFF)
			let isEnabled = output.includes("0x1");

			// Toggle to the opposite
			execSync(`reg add "${key}" /v ProxyEnable /t REG_DWORD /d ${isEnabled ? 0 : 1} /f`);
			isEnabled = !isEnabled;

			// Switch Key State
			await ev.action.setState(isEnabled ? 0 : 1);
		} catch(e) {
			console.error(e);
			await ev.action.setImage(KeyImage("#ff0000"));
		}
	}
}