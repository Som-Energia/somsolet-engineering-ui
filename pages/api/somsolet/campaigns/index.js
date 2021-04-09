const campaigns = [
  { id: 1, name: 'Som Solet', active: true },
  { id: 2, name: 'Gir Solar', active: true },
  { id: 3, name: 'Nura Solar', active: false }
]

export default (req, res) => {
  res.status(200).json(campaigns)
}
