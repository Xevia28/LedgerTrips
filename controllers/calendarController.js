exports.calendar = async (req, res, next) => {
    try {
        res.render('./Dashboard/calendar.ejs');
    } catch (error) {
        console.log(error);
    }
};
