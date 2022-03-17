module.exports = (sequelize, Sequelize) => {
	const Events = sequelize.define("events", {
		id_event: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		location: {
			type: Sequelize.STRING(100),
			allowNull: false
		},
		start_date: {
			type: Sequelize.DATE,
			allowNull: false
		},
		end_date: {
			type: Sequelize.DATE,
			allowNull: false
		},
		price: {
			type: Sequelize.DECIMAL(16,2),
		},
		image_name: {
			type: Sequelize.STRING(50)
		},
		updated_by: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		created_by: {
			type: Sequelize.INTEGER,
			allowNull: false
		},
		created_date: {
			type: Sequelize.DATE,
			allowNull: false
		},
		is_deleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false
		}
    });
    return Events;
};