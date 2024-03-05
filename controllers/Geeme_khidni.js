const Geeme = require('../models/photball');
const { StatusCodes } = require('http-status-codes')
const playerBanao = async (req, res) => {
  req.body.banayaKisne = req.banda.insaanId;
  const player = await Geeme.create(req.body)
  res.status(StatusCodes.CREATED).json({ player })

}
const playerDedo = async (req, res) => {
  const players = await Geeme.find({ banayaKisne: req.banda.insaanId }).sort('banayaKisne')
  res.status(StatusCodes.OK).json({ players, count: players.length })
}


module.exports = {
  playerBanao,
  playerDedo
}