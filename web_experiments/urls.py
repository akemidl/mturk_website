from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin

from web_experiments.views import *

urlpatterns = patterns("",
    url(r"^$", index, name="home"),
    url(r"^experiment_example/$",exp_page_example),
    url(r"^experiment_bandit_(?P<outcome_type>\w{0,50})/$", exp_page_bandit),
    url(r"^experiment_ambi_(?P<outcome_type>\w{0,50})/$", exp_page_ambi),
    url(r"^experiment_ambicombined/$", exp_page_ambi_combined),
    url(r"^e_bandit_(?P<outcome_type>\w{0,50})/$", exp_page_bandit),
    url(r"^e_ambi_(?P<outcome_type>\w{0,50})/$", exp_page_ambi),
    url(r"^experiment_horizon_(?P<outcome_type>\w{0,50})/$", exp_page_horizon),
    url(r"^survey_(?P<survey_name>\w{0,50})/$",surveyDisplay),
    url(r"^survey_(?P<survey_name>\w{0,50})/processSurvey$",surveyProcess),
    url(r"^c_(?P<survey_name>\w{0,50})/$",consentDisplay),
    url(r"^c_(?P<survey_name>\w{0,50})/processConsent$",consentProcess),
    url(r"^s_(?P<survey_name>\w{0,50})/$",surveyDisplay),
    url(r"^s_(?P<survey_name>\w{0,50})/processSurvey$",surveyProcess),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^account/", include("account.urls")),
    url(r"^info_sheet/", infosheetDisplay),
    url(r"^withdraw/", withdrawDisplay),
    url(r"^completed/", completed),
    url(r"^recontact/recontact_results$",recontactProcess),
    url(r"^recontact/",recontactDisplay),
)


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
