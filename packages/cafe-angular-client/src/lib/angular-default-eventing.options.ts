import {ClientEventing} from '@cafe/cafe-model';
import {CafeDefaultProviders, RequiredEventingOptions} from '@cafe/cafe';
import {
  AngularEventingOptions,
  AngularRequiredEventingOptions,
  RouterEventInformation,
  UrlSource
} from './angular-default-eventing.interface';
import {CafeAngularClientProviders} from './cafe-angular-client.providers';

export class AngularDefaultEventingOptions implements AngularRequiredEventingOptions, RequiredEventingOptions {

  productEnvironment: ClientEventing.Environment;
  productPlatform: ClientEventing.ProductPlatform;
  hostPlatform: ClientEventing.ProductPlatform;
  hostEnvironment: ClientEventing.Environment;
  userPlatform: ClientEventing.UserPlatform;
  userEnvironment: ClientEventing.Environment;
  eventingEndpoint: string;
  apiKey: string;
  bufferInterval: number;
  maxBufferSize: number;
  profileSubmissionDelay: number;
  useNativeResolution: boolean;
  useBrowserGeoLocation: boolean;
  fetchIpAddress: boolean;
  recordViewingTime: boolean;
  recordViewingTimeWhenWindowNotVisible: boolean;
  recordViewingTimeByUrl: boolean;
  recordViewingTimeContiguously: boolean;
  viewingTimeCheckInterval: number;
  viewingTimeRecordInterval: number;
  viewingTimeRecordCategory: string;
  attemptCompletionOnClose: boolean;
  installOnUnloadHandler: boolean;
  installOnErrorHandler: boolean;
  logErrorsToService: boolean;
  urlScrubber: (string) => string;
  urlProvider: () => string;
  urlSource: UrlSource;
  routeMapper: (Router, string) => Promise<RouterEventInformation>;
  recordRoutingNavigation: boolean;

  constructor(
    {
      productPlatform,
      productEnvironment = null,
      eventingEndpoint = null,
      apiKey = null,
      hostPlatform,
      hostEnvironment,
      userPlatform,
      userEnvironment,
      bufferInterval = 60000,
      maxBufferSize = 100,
      profileSubmissionDelay = 5000,
      useNativeResolution = false,
      useBrowserGeoLocation = false,
      fetchIpAddress = false,
      recordViewingTime = false,
      recordViewingTimeWhenWindowNotVisible = false,
      recordViewingTimeByUrl = false,
      recordViewingTimeContiguously = false,
      viewingTimeCheckInterval = 5000,
      viewingTimeRecordInterval = 60000,
      viewingTimeRecordCategory = 'VIEWING_TIME',
      attemptCompletionOnClose = true,
      installOnUnloadHandler = false,
      installOnErrorHandler = false,
      logErrorsToService = false,
      urlScrubber = CafeDefaultProviders.defaultUrlScrubber,
      urlProvider = CafeDefaultProviders.defaultUrlProvider,
      urlSource = UrlSource.WINDOW_LOCATION,
      routeMapper = CafeAngularClientProviders.defaultRouteMapper,
      recordRoutingNavigation = true
    }: AngularEventingOptions
  ) {
    this.productPlatform = productPlatform;
    this.productEnvironment = productEnvironment;
    this.eventingEndpoint = eventingEndpoint;
    this.hostEnvironment = hostEnvironment;
    this.hostPlatform = hostPlatform;
    this.userEnvironment = userEnvironment;
    this.userPlatform = userPlatform;
    this.apiKey = apiKey;
    this.bufferInterval = bufferInterval;
    this.maxBufferSize = maxBufferSize;
    this.profileSubmissionDelay = profileSubmissionDelay;
    this.useNativeResolution = useNativeResolution;
    this.useBrowserGeoLocation = useBrowserGeoLocation;
    this.fetchIpAddress = fetchIpAddress;
    this.recordViewingTime = recordViewingTime;
    this.recordViewingTimeWhenWindowNotVisible = recordViewingTimeWhenWindowNotVisible;
    this.viewingTimeCheckInterval = viewingTimeCheckInterval;
    this.viewingTimeRecordInterval = viewingTimeRecordInterval;
    this.viewingTimeRecordCategory = viewingTimeRecordCategory;
    this.recordViewingTimeByUrl = recordViewingTimeByUrl;
    this.recordViewingTimeContiguously = recordViewingTimeContiguously;
    this.attemptCompletionOnClose = attemptCompletionOnClose;
    this.installOnUnloadHandler = installOnUnloadHandler;
    this.installOnErrorHandler = installOnErrorHandler;
    this.logErrorsToService = logErrorsToService;
    this.urlSource = urlSource;
    this.routeMapper = routeMapper;
    this.recordRoutingNavigation = recordRoutingNavigation;
    this.urlScrubber = urlScrubber;
    this.urlProvider = urlProvider;
  }

}
