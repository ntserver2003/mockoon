import { Environment, ProcessedDatabucket } from '@mockoon/commons';
import { Request, Response } from 'express';
import { compile as hbsCompile } from 'handlebars';
import { DataHelpers } from './templating-helpers/data-helpers';
import { FakerWrapper } from './templating-helpers/faker-wrapper';
import { Helpers } from './templating-helpers/helpers';
import { RequestHelpers } from './templating-helpers/request-helpers';
import { ResponseHelpers } from './templating-helpers/response-helpers';
import { PartialRegister } from './partial-register';

/**
 * Parse a content with Handlebars
 * @param shouldOmitDataHelper
 * @param content
 * @param environment
 * @param processedDatabuckets
 * @param request
 * @param filePath
 */
export const TemplateParser = function (
  shouldOmitDataHelper: boolean,
  content: string,
  environment: Environment,
  processedDatabuckets: ProcessedDatabucket[],
  request?: Request,
  response?: Response
  , filePath?: string // ntserver2003 patch
): string {
  let helpers = {
    ...FakerWrapper,
    ...Helpers
  };

  if (!shouldOmitDataHelper) {
    helpers = {
      ...helpers,
      ...DataHelpers(processedDatabuckets)
    };
  }

  if (request) {
    helpers = {
      ...helpers,
      ...RequestHelpers(request, environment)
    };
  }

  if (response) {
    helpers = {
      ...helpers,
      ...ResponseHelpers(response)
    };
  }

  try {
    return hbsCompile(content)(
      {},
      {
        partials: PartialRegister(filePath),
        helpers
      }
    );
  } catch (error) {
    throw error;
  }
};
