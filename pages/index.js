import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Helmet from 'react-helmet'
import { config } from 'config'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import include from 'underscore.string/include'
import { rhythm } from '../utils/typography'
import styles from '../css/index.module.css'

export default ({
  route
}) => {
  const sortedPages = sortBy(route.pages, 'data.date')
  const visiblePages = sortedPages.filter(page => (
    (get(page, 'file.ext') === 'md' && !include(page.path, '/404')) ||
      get(page, 'data.date')
  ))

  return (
    <div>
      <Helmet
        title={config.siteTitle}
        meta={[
            {'name': 'description', 'content': 'The blog of John Gibbons, a professional Software Engineer specializing in Front End Web Applications, who lives in beautiful San Francisco, CA.'},
            {'name': 'keywords', 'content': 'software, engineering, blog, personal, gibbons, front end, javascript'}
        ]}
        />
      <h1>
        The blog of John Gibbons
      </h1>
      <p>Hey there!  My name is John Gibbons, and this is my personal blog, where I discuss mostly software engineering, and in particular all things related to front end web development.  I'm a big lover of all things web and especially JavaScript.</p>
      <ul className={styles.pageLinksList}>
        {visiblePages.map((page) => (
          <li
            key={page.path}
            style={{
              marginBottom: rhythm(1 / 4)
            }}
          >
            <Link style={{boxShadow: 'none'}} to={prefixLink(page.path)}>
              {get(page, 'data.title', page.path)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
