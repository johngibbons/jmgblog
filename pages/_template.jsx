import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import '../css/markdown-styles'
import '../css/global'
import styles from '../css/template.module.css'
import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any
    }
  },
  render () {
    return (
      <div>
        <header>
          <Container
            className={styles.container}
            style={{
              maxWidth: 960,
              paddingTop: 0,
              padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
              lineHeight: 0,
              backgroundColor: 'white'
            }}
          >
            <Link
              className={styles.mainLogo}
              to={prefixLink('/')}
              style={{
                textDecoration: 'none'
              }}
            >
              <img
                className={styles.headerAvatar}
                src={prefixLink('/john_150px.jpg')}
              />
              <hgroup className={styles.textContainer}>
                <h1 className={styles.title}>The Notorious G.I.B.</h1>
                <h2 className={styles.subtitle}>thoughts on software and other stuff</h2>
              </hgroup>
            </Link>
            <nav className={styles.links}>
              <Link to={prefixLink('/about/')} >About</Link>
            </nav>
          </Container>
        </header>
        <Container
          style={{
            maxWidth: 960,
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
            paddingTop: 0
          }}
        >
          {this.props.children}
        </Container>
      </div>
    )
  }
})
