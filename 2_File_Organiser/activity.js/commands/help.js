function helpfun() {
    console.log(`List of all commands are  :
    1.node mycli.js view<dirname> tree
    2.node mycli.js view<dirname> flat
    3. node mycli.js organize<dirname>
    `);
}
module.exports = {
    fn: helpfun

}