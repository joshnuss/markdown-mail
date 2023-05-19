<script>
  import { formHelper } from '$lib/formHelper'

  export let data

  $: ({ broadcast } = data)

  $: form = formHelper({
    defaults: broadcast
  })

  function confirmDelete(e) {
    if (!confirm("Are you sure?")) {
      e.preventDefault()
    }
  }
</script>

<section class="title">
  <h1>{broadcast.subject}</h1>

  <section class="actions">
    <form method="POST" action="?/delete" on:submit={confirmDelete}>
      <button class="delete">Delete</button>
    </form>

    <form method="POST" action="?/send">
      <button>Send</button>
    </form>
  </section>
</section>

<form class="full" method="POST" action="?/update">
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

  <button>Update</button>
</form>
