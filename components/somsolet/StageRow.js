import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'

const StageRow = (props) => {
  const { date, invalid, file } = props
  const classes = useStyles()
  return (
    <div className={classes.stage}>
      <div>
        {date &&
          (invalid === true ? (
            <IconButton size="small">
              <ErrorOutlineIcon color="error" />
            </IconButton>
          ) : invalid === false ? (
            <IconButton size="small">
              <CheckCircleOutlineIcon color="primary" />
            </IconButton>
          ) : (
            ''
          ))}
      </div>
      <div>
        &nbsp;
        <Link href="#" color="inherit" className={classes.link}>
          <span>{date && new Date(date).toLocaleDateString()}</span>
        </Link>
      </div>
      <div>
        {!date && (
          <IconButton size="small">
            <PublishOutlinedIcon />
          </IconButton>
        )}
      </div>
    </div>
  )
}

export default StageRow

const useStyles = makeStyles((theme) => ({
  stage: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center'
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
