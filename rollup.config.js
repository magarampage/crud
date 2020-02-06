import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize';

const NODE_ENV = process.env.NODE_ENV || 'development'
const outputFile = NODE_ENV === 'production' ? './dist/index.js' : './lib/index.js'

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
		}
	],
	// All the used libs needs to be here
	external: [
		'antd',
		'antd-local-icon',
		'auth0-lock',
		'classnames',
		'connected-react-router',
		'draft-js',
		'draftjs-to-html',
		'enzyme',
		'enzyme-adapter-react-16',
		'enzyme-to-json',
		'immutable',
		'immutable-devtools',
		'jest-css-modules',
		'jsdom',
		'moment',
		'react',
		'react-dom',
		'react-draft-wysiwyg',
		'react-flexbox-grid',
		'react-redux',
		'react-router',
		'react-router-dom',
		'react-rte',
		'react-select',
		'react-select-virtualized',
		'react-slick',
		'react-virtualized',
		'redux',
		'redux-form',
		'redux-mock-store',
		'redux-saga',
		'redux-thunk',
		'regenerator-runtime',
		'rollup-plugin-image',
		'rollup-plugin-uglify',
		'sm-redux-saga-request',
		'sm-string-helper',
		'styled-components'
	],
	plugins: [
		resolve(),
		babel({
			exclude: '**/node_modules/**',
			runtimeHelpers: true
		}),
		replace({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		}),
		commonjs(),
		postcss({
			plugins: []
		}),
		terser(),
		filesize()
	]
}
