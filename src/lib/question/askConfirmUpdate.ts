/**
 * Generate Release
 * Written by Kevin Gravier <kevin@mrkmg.com>
 * MIT License 2018
 */

import {prompt} from "inquirer";

export function askConfirmUpdate(currentVersion: string, newVersion: string): Promise<boolean> {
    const args = {
        message: `Are you sure you want to update the release from ${currentVersion} to ${newVersion}`,
        name: "confirm",
        type: "confirm",
    };

    return prompt(args).then((r: any) => r.confirm as boolean);
}
