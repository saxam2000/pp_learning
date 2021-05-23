let db;


function openGalleryDB() {
    let openRequest = indexedDB.open("gallery", 1);
    openRequest.onsuccess = function() {
        db = openRequest.result;
    }
    openRequest.onerror = function() {
        console.log("error");
    }
    openRequest.onupgradeneeded = function() {
        db = openRequest.result;
        if (!db.objectStoreNames.contains('photos')) {
            db.createObjectStore("photos", { keyPath: "id" })
        }
        if (!db.objectStoreNames.contains('videos')) {
            db.createObjectStore("videos", { keyPath: "id" })
        }
    }
}



openGalleryDB();

function enterData(type, url) {
    let txn = db.transaction(type, "readwrite");
    let items = txn.objectStore(type);
    let newItem = {
        id: Date.now(),
        url: url
    }
    let req = items.add(newItem);
    req.onsuccess = function() {
        console.log("added successfully", req.result);
    }
    req.onerror = function(error) {
        console.log(error)
    }
}

function getData(type) {
    // openGalleryDB();
    let txn = db.transaction(type, "readonly");
    let photo = txn.objectStore("photos");
    let request = photo.openCursor();
    request.onsuccess = function() {
        let cursor = request.result;
        if (cursor) {
            let key = cursor.key; // book key (id field)
            let value = cursor.value.type; // book object
            console.log(key, value);
            cursor.continue();
        } else {
            console.log("No more books");
        }
    }
    request.onerror = function(error) {
        console.log("fetching error----", error);
    }
}