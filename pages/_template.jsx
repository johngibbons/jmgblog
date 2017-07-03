import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import '../css/markdown-styles'
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
        <Headroom
          wrapperStyle={{
            marginBottom: rhythm(1)
          }}
        >
          <Container
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
              <span>The Notorious G.I.B.</span>
            </Link>
          </Container>
        </Headroom>
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
