let saksham = {
        name: "hero",

        age: 21,
        address: {
            city: "kotdwara",
            block: "padampur"
        },
        movies: ["first movie", "second movie", "third movie"],
        isqualified: true,
        sayhi: function() {
            console.log("saksham is saying hi")
            return "blessing from saksham";
        }

    }
    // GET VALUE
console.log(saksham.name);
console.log(saksham.address.city)
console.log(saksham.movies[1]);
console.log(saksham.sayhi());
// for in loop
for (let key in saksham) {
    console.log("value at", key, "is", saksham[key])
}