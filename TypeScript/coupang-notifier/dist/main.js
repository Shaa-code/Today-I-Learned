"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const play_sound_1 = __importDefault(require("play-sound"));
let mainWindow = null;
function createWindow() {
    mainWindow = new electron_1.BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    mainWindow.loadURL("data:text/html, <h1>Coupang Notifier 실행 중...</h1>");
}
async function playAlertSound() {
    const player = (0, play_sound_1.default)();
    player.play(path_1.default.join(__dirname, "../src/assets/alert.mp3"), (err) => {
        if (err)
            console.error("Error playing sound:", err);
    });
}
function flashWindow() {
    if (mainWindow) {
        mainWindow.setAlwaysOnTop(true);
        mainWindow.flashFrame(true);
        setTimeout(() => {
            if (mainWindow) {
                mainWindow.setAlwaysOnTop(false);
                mainWindow.flashFrame(false);
            }
        }, 3000);
    }
}
async function checkStockAndNotify() {
    const browser = await puppeteer_1.default.launch({ headless: false });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36");
    await page.goto("https://www.coupang.com/vp/products/8641586975?itemId=25078503900&vendorItemId=92082457628");
    console.log(page);
    const clickOption = async (label) => {
        const elements = await page.$$(`span:has-text("${label}")`);
        if (elements[0])
            await elements[0].click();
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };
    await clickOption("스카이 블루");
    await clickOption("512GB");
    await clickOption("24GB");
    const soldOut = await page.$$('span:has-text("일시품절")');
    await browser.close();
    if (soldOut.length === 0) {
        new electron_1.Notification({
            title: "재입고 알림!",
            body: "맥북 M4, 24GB / 512GB 스카이블루 구매 가능!",
        }).show();
    }
    else {
        console.log("아직 품절입니다.");
        // Play sound and flash window when items are sold out
        await playAlertSound();
        flashWindow();
    }
}
electron_1.app.whenReady().then(() => {
    createWindow();
    checkStockAndNotify();
    setInterval(checkStockAndNotify, 300000); //5분마다 반복하도록 설정
});
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "win32")
        electron_1.app.quit();
});
