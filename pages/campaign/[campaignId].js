import { useState } from 'react'

import Breadcrumbs from 'components/layout/Breadcrumbs'
import StageRow from 'components/somsolet/StageRow'

import { makeStyles } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Heading from '@/components/layout/Heading'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'

import TimelineOutlinedIcon from '@material-ui/icons/TimelineOutlined'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined'
import PowerOutlinedIcon from '@material-ui/icons/PowerOutlined'

import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'

import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LanguageIcon from '@material-ui/icons/Language'

import { getProjects, getCCH } from '@/lib/project'
import { getCampaign } from '@/lib/campaign'

export default function Campaign(props) {
  const classes = useStyles()
  const { projects, campaign } = props

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const headers = [
    '',
    'Installation',
    'Status',
    'Name',
    'CCH',
    'Prereport',
    'Date technical visit',
    'Report',
    'Offer',
    'Signature',
    'Permit',
    'Installation',
    'Delivery certificate',
    'Legal registration',
    'Legal certificate',
    'Technical details'
  ]

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.top}>
          <Heading>
            <WbSunnyOutlinedIcon fontSize="large" />
            &nbsp;{`${campaign?.name}`}
          </Heading>
          <Breadcrumbs />
        </div>
        <Paper aria-label="filters" elevation={0} className={classes.filters}>
          <FormControl className={classes.formControl}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              autoWidth
              variant="outlined">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Paper>
        <TableContainer component={Paper} elevation={0}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="campanya detalls">
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    align={index > 0 ? 'center' : 'left'}
                    className={classes.headerCell}>
                    {header}
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
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={projects.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Container>
    </div>
  )
}

const Row = (props) => {
  const { description, warnings, stages } = props
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleCCH = async (projectId) => {
    const cch = await getCCH(projectId)
    console.log(cch)
  }

  return (
    <>
      <TableRow className={classes.cell}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{description?.name}</TableCell>
        <TableCell>
          <Chip
            size="small"
            variant="outlined"
            label={description?.stageId.toUpperCase()}
          />
        </TableCell>
        <TableCell>
          <Link
            color="inherit"
            className={classes.link}
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
        <TableCell>
          <StageRow {...stages?.prereport} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.technicalVisit} />
        </TableCell>
        <TableCell>
          <StageRow {...stages?.report} />
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
        <TableCell></TableCell>
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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginBottom: '12px'
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0'
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 24px',
    marginBottom: '24px'
  },
  headerCell: {
    whiteSpace: 'nowrap'
  },
  cell: {
    whiteSpace: 'nowrap',
    '& > *': {
      borderBottom: 'unset'
    }
  },
  link: {
    textDecoration: 'underline',
    textUnderlineOffset: '1px',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}))

export async function getServerSideProps(context) {
  const { campaignId } = context.query

  const projectsResponse = await getProjects(campaignId)
  const projects = projectsResponse?.data ? projectsResponse.data : []

  const campaignResponse = await getCampaign(campaignId)
  const campaign = campaignResponse?.data ? campaignResponse.data : []

  return {
    props: { projects, campaign } // will be passed to the page component as props
  }
}
