from django.conf import settings
from django.conf.urls import patterns, include, url
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin

from web_experiments.views import *

urlpatterns = patterns("",
    url(r"^$", index, name="home"),
    url(r"^experiment_bandit_(?P<outcome_type>\w{0,50})/$", exp_page_bandit),
    url(r"^experiment_ambi_(?P<outcome_type>\w{0,50})/$", exp_page_ambi),
    url(r"^experiment_horizon_(?P<outcome_type>\w{0,50})/$", exp_page_horizon),
    url(r"^experiment_motiondots/$", exp_page_motiondots),
    url(r"^survey_(?P<survey_name>\w{0,50})/$",surveyDisplay),
    url(r"^survey_(?P<survey_name>\w{0,50})/processSurvey$",surveyProcess),
    url(r"^admin/", include(admin.site.urls)),
    url(r"^account/", include("account.urls")),
    url(r"^completed/", completed),
    url(r"^test/",test)
)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
