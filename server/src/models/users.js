export default (sequelize, type) => {
    return sequelize.define('users', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        first_name: type.STRING,
        last_name: type.STRING,
        father_name: type.STRING,
        phone: type.STRING,
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Email address must be valid"
                }
            }
        },
        password: {
            type: type.STRING,
            allowNull: false,
        },
        address: type.TEXT,
        dob: type.DATE,
        gender: type.STRING,
        photos: { 
            type: type.STRING,
            allowNull: true,
            defaultValue: null,
            get: function() {
                return JSON.parse(this.getDataValue('photos'));
            }, 
            set: function(val) {
                return this.setDataValue('photos', JSON.stringify(val));
            }
        },
        country: {
            type: type.STRING,
            allowNull: false
        },
        deleted_at: {
            allowNull: true,
            defaultValue: null,
            type: type.DATE
        },
        created_at: type.DATE,
        updated_at: type.DATE,
    })

}
