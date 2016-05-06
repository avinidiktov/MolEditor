Bonds = [];

padding = interval/8;


function bondLayout() {
    Bonds.splice(0, Bonds.length);
    for (var i = 0; i < WIDTH/interval; i++) {
        for (var j = 0; j < HEIGHT/interval; j++) {
            if (field[i][j].name) {
                createBondAreas(field[i][j].w*interval,field[i][j].h*interval);
            }
        }
    }
}
