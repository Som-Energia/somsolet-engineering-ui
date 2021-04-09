const campaignItems = [
  { id: 1, name: 'Mas Xiberta', active: true },
  { id: 2, name: 'Carrer Tramuntana, 4, 1r 1a', active: true },
  { id: 3, name: 'Carrer Gausfred Llong, 11', active: false }
]

export default (req, res) => {
  const { campaignId } = req.query
  res
    .status(200)
    .json(
      campaignItems.filter((campaign) => campaign.id === parseInt(campaignId))
    )
}
