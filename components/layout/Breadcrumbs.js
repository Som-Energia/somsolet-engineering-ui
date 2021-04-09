import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import MuiBreadcrumbs from '@material-ui/core/Breadcrumbs'
import MuiLink from '@material-ui/core/Link'
import IconButton from '@material-ui/core/IconButton'

import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined'

const convertBreadcrumb = (string) => {
  return string
    .replace(/-/g, ' ')
    .replace(/oe/g, 'ö')
    .replace(/ae/g, 'ä')
    .replace(/ue/g, 'ü')
    .toUpperCase()
}

const Breadcrumbs = () => {
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState(null)

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split('/')
      linkPath.shift()

      const pathArray = linkPath.map((path, i) => {
        return {
          breadcrumb: path,
          href: '/' + linkPath.slice(0, i + 1).join('/')
        }
      })

      setBreadcrumbs(pathArray)
    }
  }, [router])

  if (!breadcrumbs) {
    return null
  }

  return (
    <MuiBreadcrumbs aria-label="breadcrumbs">
      <Link href="/" passHref>
        <MuiLink color="inherit">
          <IconButton edge="end" size="small">
            <AppsOutlinedIcon />
          </IconButton>
        </MuiLink>
      </Link>
      {/*breadcrumbs.map((breadcrumb, i) => {
        return (
          <Link key={breadcrumb.href} href={breadcrumb.href} passHref>
            <MuiLink color="inherit">
              {convertBreadcrumb(breadcrumb.breadcrumb)}
            </MuiLink>
          </Link>
        )
      }) */}
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
