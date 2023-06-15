const Program = require('./programModel');
const Application = require('./applicationModel');
const Type = require('./typeModel');
const Subsystem = require('./subsystemModel');
const User = require('./userModel');

Program.hasMany(Application)
Application.belongsTo(Program)

Subsystem.hasMany(Application)
Application.belongsTo(Subsystem)

Type.hasMany(Application)
Application.belongsTo(Type)

Program.hasMany(Subsystem, { onDelete: 'CASCADE' });
Subsystem.belongsTo(Program);

module.exports = {
	Program,
	Application,
	Type,
	Subsystem,
	User,
}
