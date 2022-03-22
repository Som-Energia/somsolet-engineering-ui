import { useState, useContext } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { CSVLink } from 'react-csv'
import * as dayjs from 'dayjs'

import Breadcrumbs from '@components/layout/Breadcrumbs'
import StageRow from '@components/somsolet/StageRow'
import ProjectTechnicalDetails from '@components/somsolet/ProjectTechnicalDetails'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Container from '@mui/material/Container'

import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'

import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'

import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LanguageIcon from '@mui/icons-material/Language'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import FilterListIcon from '@mui/icons-material/FilterList'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined'

import CampaignContext from 'context/campaign'
import Heading from '@components/layout/Heading'

import {
  getProjects,
  getCCH,
  getStages,
  getSelectedTechnicalDetails
} from '@lib/project'

import { getCampaign } from '@lib/campaign'

export default function Campaign(props) {
  const { projects, campaign, stages } = props
  const { t } = useTranslation()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showFilters, setShowFilters] = useState(false)
  const [csvData, setCsvData] = useState([])

  const { selectedProjects } = useContext(CampaignContext)

  const headers = [
    'Installation',
    'Status',
    'Name',
    'CCH',
    'Technical details',
    'Prereport',
    'Technical visit',
    'Report',
    'Offer',
    'Signature',
    'Permit',
    'Installation',
    'Delivery certificate',
    'Legal registration',
    'Legal certificate'
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const applyFilters = () => {
    console.log('apply filters!')
  }

  const handleDownload = async (event, done) => {
    const details = await getSelectedTechnicalDetails(selectedProjects)
    console.log(selectedProjects.length)
    if (selectedProjects?.length > 0) {
      setCsvData(details)
      done()
    } else {
      done(false)
      setCsvData([])
    }
  }

  return (
    <Box sx={{ width: '100%', marginBottom: '12px' }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0'
          }}>
          <Heading>
            <WbSunnyOutlinedIcon fontSize="large" />
            &nbsp;{`${campaign?.name}`}
          </Heading>
          <Breadcrumbs />
        </Box>
        {showFilters && (
          <Paper
            aria-label="filters"
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 20px',
              marginBottom: '16px'
            }}>
            <Grid container spacing={3}>
              <Grid item sm={2}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status-select"
                    label="Status">
                    {stages.map(({ stageId, stageName }) => (
                      <MenuItem key={stageId} value={stageId}>
                        {stageName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel id="warning-select-label">Warning</InputLabel>
                  <Select
                    labelId="warning-select-label"
                    id="warning-select"
                    label="Warning">
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={3}>
                <TextField
                  label="Client"
                  fullWidth
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PermIdentityOutlinedIcon
                        sx={{
                          '& input': {
                            color: 'rgba(0, 0, 0, 0.54)'
                          },
                          '& path': {
                            color: 'rgba(0, 0, 0, 0.54)'
                          }
                        }}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid item sm={3}>
                <TextField
                  label="Municipi"
                  fullWidth
                  size="small"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <PlaceOutlinedIcon
                        sx={{
                          '& input': {
                            color: 'rgba(0, 0, 0, 0.54)'
                          },
                          '& path': {
                            color: 'rgba(0, 0, 0, 0.54)'
                          }
                        }}
                      />
                    )
                  }}
                />
              </Grid>
              <Grid
                item
                sm={2}
                style={{
                  textAlign: 'right',
                  display: 'flex',
                  'justify-content': 'space-between'
                }}>
                <Button color="primary" variant="contained" disableElevation>
                  <SearchOutlinedIcon />
                </Button>
                <CSVLink
                  data={csvData}
                  asyncOnClick={true}
                  filename={`${campaign.name} - ${dayjs().format(
                    'YYYYMMDDHHmmss'
                  )}.csv`}
                  onClick={handleDownload}>
                  <Button
                    color="secondary"
                    variant="contained"
                    disabled={!selectedProjects.length}>
                    <GetAppOutlinedIcon />
                  </Button>
                </CSVLink>
              </Grid>
            </Grid>
          </Paper>
        )}

        <TableContainer component={Paper} elevation={0}>
          <Table
            sx={{}}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="campanya detalls">
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{ whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                  <IconButton size="small" onClick={toggleFilters}>
                    <FilterListIcon />
                  </IconButton>
                </TableCell>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    align={index > 0 ? 'center' : 'left'}
                    sx={{ whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
                    {t(header)}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project, index) => (
                <Row key={index} {...project} />
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </Box>
  )
}

const Row = (props) => {
  const { description, warnings, stages } = props
  const [selected, setSelected] = useState(false)
  const [open, setOpen] = useState(false)

  const { selectedProjects, setSelectedProject } = useContext(CampaignContext)

  const handleCCH = async (projectId) => {
    const cch = await getCCH(projectId)
    console.log(cch)
  }

  const handleCheck = (event) => {
    let updatedSelection = [...selectedProjects, description]
    if (selected) {
      updatedSelection = updatedSelection.filter(
        (item) => item.name !== description.name
      )
    }

    setSelectedProject(updatedSelection)
    setSelected(!selected)
  }

  return (
    <>
      <TableRow
        sx={{
          whiteSpace: 'nowrap',
          '& > *': {
            borderBottom: 'unset'
          }
        }}>
        <TableCell>
          <Checkbox checked={selected} onChange={handleCheck} />
        </TableCell>
        <TableCell>{description?.name}</TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            variant="outlined"
            label={description?.stageId.toUpperCase()}
          />
        </TableCell>
        <TableCell>
          <Link
            color="inherit"
            sx={{
              textDecoration: 'underline',
              textUnderlineOffset: '1px',
              cursor: 'pointer',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
            onClick={() => setOpen(!open)}>
            {description?.registeredPerson?.name}
          </Link>
        </TableCell>
        <TableCell>
          <IconButton
            size="small"
            onClick={() => handleCCH(description?.projectId)}>
            <TimelineOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <ProjectTechnicalDetails {...description} />
        </TableCell>
        <TableCell align="center">
          <StageRow
            id="prereport"
            project={description?.name}
            client={description?.registeredPerson?.name}
            {...stages?.prereport}
          />
        </TableCell>
        <TableCell align="center">
          <StageRow
            id="technicalVisit"
            project={description?.name}
            client={description?.registeredPerson?.name}
            {...stages?.technicalVisit}
          />
        </TableCell>
        <TableCell align="center">
          <StageRow
            id="report"
            project={description?.name}
            client={description?.registeredPerson?.name}
            {...stages?.report}
          />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.offer} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.signature} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.constructionPermit} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.installation} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.deliveryCertificate} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.legalRegistration} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.legalization} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0} pb={1} px={2}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <PowerOutlinedIcon fontSize="small" />
                  </IconButton>
                  {description?.supplyPoint?.cups}
                </Grid>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <HomeOutlinedIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  {description?.supplyPoint?.address?.street}
                </Grid>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <PlaceOutlinedIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  {description?.supplyPoint?.address?.municipality}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={20}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={0} pb={1}>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <MailOutlineIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  {description?.registeredPerson?.email}
                </Grid>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <PhoneOutlinedIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  {description?.registeredPerson?.phoneNumber}
                </Grid>
                <Grid item xs={12}>
                  <IconButton size="small">
                    <LanguageIcon fontSize="small" />
                  </IconButton>
                  &nbsp;
                  {description?.registeredPerson?.language}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export async function getServerSideProps(context) {
  try {
    const { campaignId } = context.query

    const projectsResponse = await getProjects(campaignId)
    const projects = projectsResponse?.data || []

    const campaignResponse = await getCampaign(campaignId)
    const campaign = campaignResponse.data || []

    const stageResponse = await getStages()
    const stages = stageResponse?.data || []

    return {
      props: { projects, campaign, stages } // will be passed to the page component as props
    }
  } catch (error) {
    console.log(error)
  }
}
