defmodule Discuss.TopicController do
  use Discuss.Web, :controller

  alias Discuss.Topic
  def new(conn, params) do
    changeset = Discuss.Topic.changeset(%Topic{}, %{})
  end
end
