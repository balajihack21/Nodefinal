const express=require('express')
const bodyparser=require('body-parser')
const cors=require('cors')
const Sequelize=require('sequelize')

const {sequelize,Player}=require('./model/Player')
// const dataRouter=require('./router/data')

const app=express()

app.use(cors())
app.use(bodyparser.json())

sequelize.sync()
.then(res=>{
    // console.log(res)
    console.log("Connected Successfully")
    app.listen(4000)
})
.catch(err=>{
    console.log(err)
})

app.put('/api/updatePlayer/:id',async (req,res)=>{
    const { id } = req.params;
    const {name,dob,url,photoUrl,birthplace,matches,score,fifties,centuries,wickets,average}=req.body
    try {
      const players = await Player.findAll({
      where:{id:id}
      });
      players[0].name=name;
      players[0].dob=dob;
      players[0].url=url;
      players[0].photoUrl=photoUrl;
      players[0].birthplace=birthplace;
      players[0].matches=matches;
      players[0].score=score;
      players[0].fifties=fifties;
      players[0].centuries=centuries;
      players[0].wickets=wickets;
      players[0].average=average;
      await players[0].save()
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error Updating player' });
    }
  })

app.post('/api/addPlayer', async (req, res) => {
    try {
      const player = await Player.create(req.body);
      res.json(player);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error adding player' });
    }
  });

  app.get('/api/searchPlayer', async (req, res) => {
    const { name } = req.query;
    try {
      const players = await Player.findAll({
      where:{name:name}
      });
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error searching player' });
    }
  });

  app.get('/api/getPlayer/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const players = await Player.findAll({
      where:{id:id}
      });
      res.json(players);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error searching player' });
    }
  });

