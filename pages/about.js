import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'
import styles from '../css/about.module.css'
import { prefixLink } from 'gatsby-helpers'

exports.data = {
  title: 'About',
  path: '/about'
}

export default () => {
  return (
    <div>
      <Helmet
        title={config.siteTitle}
        meta={[
            {'name': 'description', 'content': 'The blog of John Gibbons, a professional Software Engineer specializing in Front End Web Applications, who lives in beautiful San Francisco, CA.'},
            {'name': 'keywords', 'content': 'software, engineering, blog, personal, gibbons, front end, javascript'}
        ]}
        />
      <div className={styles.about}>
        <h1 className={styles.title}>About</h1>
        <p className={styles.bio}>Hey there.  My name is John Gibbons, I'm a software engineer based out of beautiful San Francisco, CA.  My main interests are based around front end web development, but I work across the full stack building cool things.</p>
        <img
          className={styles.aboutPhoto}
          src={prefixLink('/john.jpg')}
      />
      </div>
    </div>
  )
}
