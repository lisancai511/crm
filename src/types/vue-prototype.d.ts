import Vue from 'vue'
import TVue from 'vue/types'
import moment from 'moment/moment'

declare module 'vue/types/vue' {
  interface Vue {
    $bus: TVue;

    $moment (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, strict?: boolean): moment.Moment;

    $moment (inp?: moment.MomentInput, format?: moment.MomentFormatSpecification, language?: string, strict?: boolean): moment.Moment;
  }
}
