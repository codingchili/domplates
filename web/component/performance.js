const CONSOLE_LOG = false;

export default function measure(name, method) {
    let start = performance.now();
    method();
    let end = performance.now();
    if (CONSOLE_LOG) {
        console.log(`[performance] action '${name}' took ${(end - start).toFixed(2)}ms.`);
    }
}