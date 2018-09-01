// combine all css files into one with webpack. Hack to deal with server side rendering.
if (typeof window !== 'undefined') {
	require('../assets/scss/theme.scss');
}
