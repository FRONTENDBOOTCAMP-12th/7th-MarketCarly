import { css } from 'lit';

export default css`
  /* 숨김 콘텐츠 */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  /* 포커스 스타일링 */
  :focus {
    outline: none;
  }

  :focus-visible {
    box-shadow: 0 0 2px 2px rgb(224, 86, 86, 0.85);
    border-radius: 4px;
  }

  :is(
      input[type='email'],
      input[type='password'],
      input[type='text']
    ):focus-visible {
    box-shadow: none;
  }
`;
