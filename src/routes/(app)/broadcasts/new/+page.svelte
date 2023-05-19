<script>
  import { formHelper } from '$lib/formHelper'

  $: form = formHelper({
    defaults: {
      subject: '',
      content: ''
    }
  })
</script>

<h1>New broadcast</h1>

<form class="full" method="POST">
  <label>
    <span>Subject</span>
    <input
      name="subject"
      class:error={form.error('subject')}
      value={form.fields.subject}/>
  </label>

  <label>
    <span>Content</span>
    <textarea
      name="content"
      class:error={form.error('content')}
      value={form.fields.content}/>
  </label>

  <button>Create</button>
</form>
