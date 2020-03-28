
export async function getJson(url) {
    var respone = await fetch(url);
    var obj = await respone.json();
    return obj;
}