defmodule Discuss.CommentsChannel do
  use Discuss.Web, :channel

  def join("comments:" <> topic_id, _params, socket) do
    topic_id = String.to_integer(topic_id)
    topic = Topic
      |> Repo.get(topic_id)
      |> Repo.preload(comments: [:user])
    {:ok, %{hey: "there"}, socket}
  end

  def handle_in(name, message, socket) do
    {:replay, :ok, socket}
  end
end
