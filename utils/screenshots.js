async function takeScreen(target, folder, name) {
    await target.screenshot({ path: `screenshots/${folder}/${name}.png`})
}

module.exports = { takeScreen }

