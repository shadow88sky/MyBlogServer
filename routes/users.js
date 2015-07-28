router.get("/name", function (req, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        console.log('connected as id ' + connection.threadId);
        connection.query("select * from t_floor", function (err, rows) {
            connection.release();
            if (!err) {
                res.jsonp(rows);
            }
        });
    });

    connection.on('error', function (err) {

        res.json({"code": 100, "status": "Error in connection database"});
        return;
    });
});

router.edit = function (req, res) {

    var id = req.params.id;

    req.getConnection(function (err, connection) {

        connection.query('SELECT * FROM customer WHERE id = ?', [id], function (err, rows) {

            if (err)
                console.log("Error Selecting : %s ", err);

            res.render('edit_customer', {page_title: "Edit Customers - Node.js", data: rows});

        });

    });
};