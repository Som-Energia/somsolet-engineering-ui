import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import useTranslation from 'next-translate/useTranslation'
import { makeStyles } from '@material-ui/core/styles'

import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import PublishIcon from '@material-ui/icons/Publish'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import FileIcon from '@material-ui/icons/DescriptionOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutlineOutlined'

import { uploadFile } from 'lib/project'

const useStyles = makeStyles((theme) => ({
  input: {
    '& input': {
      color: 'rgba(0, 0, 0, 0.54)'
    },
    '& path': {
      color: 'rgba(0, 0, 0, 0.54)'
    }
  }
}))

const Uploader = (props) => {
  const { name, callbackFn, fieldError, values, maxFiles, size } = props
  const { t } = useTranslation('common')
  const classes = useStyles()

  const [uploads, setUploads] = useState([...values])
  const [inputKey, setInputKey] = useState(Date.now())
  const [isUploading, setUploading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    callbackFn(uploads)
  }, [uploads])

  const upload = useCallback(
    async (name, file) => {
      return uploadFile(name, file)
        .then((response) => {
          if (response?.data?.code === 'UPLOAD_OK') {
            setUploads([...uploads, response?.data?.file_hash])
            setInputKey(Date.now())
          } else {
            const errorMsg = response?.data?.code
              ? response?.data?.code
              : 'UNEXPECTED_ERROR'
            setError(errorMsg)
          }
        })
        .catch((error) => {
          const errorMsg = error?.response?.data?.code
            ? error.response.data.code
            : 'UNEXPECTED_ERROR'
          setError(errorMsg)
        })
    },
    [uploads]
  )

  const handleChange = useCallback(
    async (event) => {
      setUploading(true)
      const name = event.target.name
      const file = event.target.files[0]
      await upload(name, file)
      setUploading(false)
    },
    [upload]
  )

  const handleClean = (event) => {
    event.preventDefault()
    setError(false)
    setInputKey(Date.now())
  }

  const handleDelete = useCallback(
    (event, index) => {
      const uploadsToDelete = uploads
      uploadsToDelete.splice(index, 1)
      setUploads([...uploadsToDelete])
    },
    [uploads]
  )

  return (
    <>
      <TextField
        key={inputKey}
        type="file"
        label=""
        className={classes.input}
        required
        name={name}
        variant="outlined"
        onChange={handleChange}
        disabled={maxFiles <= uploads.length}
        size={size}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {isUploading ? (
                <CircularProgress size={24} />
              ) : error ? (
                <IconButton onClick={handleClean}>
                  <HighlightOffIcon />
                </IconButton>
              ) : (
                <PublishIcon />
              )}
            </InputAdornment>
          )
        }}
        error={(error || fieldError) && true}
        helperText={
          error ? t(error) : fieldError ? t(fieldError) : t('ATTACHMENTS_INFO')
        }
      />
      <List>
        {uploads.map((upload, index) => (
          <ListItem key={upload}>
            <ListItemIcon>
              <FileIcon />
            </ListItemIcon>
            <ListItemText>
              <Link href="#">{upload}</Link>
            </ListItemText>
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={(event) => handleDelete(event, index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  )
}

Uploader.propTypes = {
  name: PropTypes.string,
  values: PropTypes.array,
  maxFiles: PropTypes.number
}

Uploader.defaultProps = {
  name: 'uploads',
  values: [],
  maxFiles: 1
}

export default React.memo(Uploader)
