const Sequelize=require('sequelize')

const sequelize=new Sequelize('Nodejs','testuser','test@123',{
    host:'localhost',
    dialect:'mariadb'

})

module.exports=sequelize