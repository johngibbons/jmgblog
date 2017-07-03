import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import include from 'underscore.string/include'
import styles from '../css/index.module.css'

export default ({
  route
}) => {
  const sortedPages = sortBy(route.pages, 'data.date')
  const visiblePages = sortedPages.filter(page => (
    (get(page, 'file.ext') === 'md' && !include(page.path, '/404')) ||
      get(page, 'data.date')
  ))
  console.log(route.pages)

  return (
    <div>
      <Helmet
        title={config.siteTitle}
        meta={[
            {'name': 'description', 'content': 'The blog of John Gibbons, a professional Software Engineer specializing in Front End Web Applications, who lives in beautiful San Francisco, CA.'},
            {'name': 'keywords', 'content': 'software, engineering, blog, personal, gibbons, front end, javascript'}
        ]}
        />
      <ul className={styles.pageLinksList}>
        {visiblePages.map((page) => (
          <div
            key={page.path}
            className={styles.post}
          >
            <Link
              className={styles.titleLink}
              to={prefixLink(page.path)}
            >
              <h1 className={styles.title}>{get(page, 'data.title', page.path)}</h1>
            </Link>
            <div
              key={page.path}
              dangerouslySetInnerHTML={{__html: page.data.body}}
            />
          </div>
        ))}
      </ul>
    </div>
  )
}
