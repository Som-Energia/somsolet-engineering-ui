import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

import useTranslation from 'next-translate/useTranslation'

import {
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText
} from '@mui/material'

import PublishIcon from '@mui/icons-material/Publish'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import FileIcon from '@mui/icons-material/DescriptionOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { uploadFile } from 'lib/project'

const Uploader = (props) => {
  const { name, callbackFn, fieldError, values, maxFiles, size } = props
  const { t } = useTranslation('common')

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
        name={name}
        variant="outlined"
        onChange={handleChange}
        disabled={maxFiles <= uploads.length}
        size={size}
        fullWidth
        sx={{
          '& input': {
            color: 'rgba(0, 0, 0, 0.54)'
          },
          '& path': {
            color: 'rgba(0, 0, 0, 0.54)'
          }
        }}
        required
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
          <div key={index}>
            <ListItem>
              <ListItemIcon>
                <FileIcon />
              </ListItemIcon>
              <ListItemText>
                {upload !== undefined && <Link href="#">{upload}</Link>}
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
          </div>
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
