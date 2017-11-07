var _paq = _paq || [];
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
	var u = PiwikConfig.url;
	_paq.push(['setTrackerUrl', u + PiwikConfig.home]);
	_paq.push(['setSiteId', '1']);
	var d = document,
		g = d.createElement('script'),
		s = d.getElementsByTagName('script')[0];
	g.type = 'text/javascript';
	g.async = true;
	g.defer = true;
	g.src = u + 'piwik.js';
	s.parentNode.insertBefore(g, s);
})();

//访客信息
try {
	var userInformation = getCookie("loginManager");
	if(userInformation != "" && userInformation != null && userInformation != undefined) {
		userInformation = JSON.parse(userInformation);
		userInformationId = userInformation.id;
		userInformationLoginId = userInformation.loginId;
		userInformationName = userInformation.name;

		_paq.push(['setUserId', userInformationLoginId]);
		_paq.push(['setCustomVariable', 1, 'Id', userInformationLoginId, 'visit']);
		_paq.push(['setCustomVariable', 2, 'Name', userInformationName, 'visit']);
	}
} catch(err) {}