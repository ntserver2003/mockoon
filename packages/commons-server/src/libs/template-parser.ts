import { Environment } from '@mockoon/commons';
import { Request } from 'express';
import { compile as hbsCompile } from 'handlebars';
import { FakerWrapper } from './templating-helpers/faker-wrapper';
import { Helpers } from './templating-helpers/helpers';
import { RequestHelpers } from './templating-helpers/request-helpers';
import { MockoonServerOptions } from '@mockoon/commons/src';
import { PartialRegister } from './partial-register';

/**
 * Parse a content with Handlebars
 *
 * @param content
 * @param request
 * @param environment
 * @param filePath
 */
export const TemplateParser = function (
  content: string,
  request: Request,
  environment: Environment,
  filePath?: string
): string {
  try {
    return hbsCompile(content)(
      {},
      {
        partials: PartialRegister(filePath),
        helpers: {
          ...FakerWrapper,
          ...RequestHelpers(request, environment/* , serverOptions */),
          ...Helpers
        }
      }
    );
  } catch (error) {
    throw error;
  }
};
