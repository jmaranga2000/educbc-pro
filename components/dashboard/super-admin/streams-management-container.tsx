"use client";

import { useCallback, useEffect, useState } from "react";
import { StreamsList, type Stream } from "@/components/dashboard/super-admin/streams-list";
import { StreamDetailsModal, type StreamDetail } from "@/components/dashboard/super-admin/stream-details-modal";
import {
  fetchAllStreamsAction,
  fetchStreamDetailsAction,
  createStreamAction
} from "@/actions/streams.actions";

export function StreamsManagementContainer() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStream, setSelectedStream] = useState<StreamDetail | null>(null);

  const [isLoadingStreams, setIsLoadingStreams] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Load streams on mount
  useEffect(() => {
    loadStreams();
  }, []);

  const loadStreams = useCallback(async () => {
    try {
      setIsLoadingStreams(true);
      const result = await fetchAllStreamsAction();
      if (result.success) {
        setStreams(result.data as Stream[]);
      } else {
        console.error("Error fetching streams:", result.error);
        alert("Failed to load streams");
      }
    } catch (error) {
      console.error("Error loading streams:", error);
      alert("Failed to load streams");
    } finally {
      setIsLoadingStreams(false);
    }
  }, []);

  const handleViewStream = useCallback(async (streamId: string) => {
    try {
      setIsLoadingDetails(true);
      setShowDetailsModal(true);
      const result = await fetchStreamDetailsAction(streamId);
      if (result.success) {
        setSelectedStream(result.data as StreamDetail);
      } else {
        console.error("Error fetching stream details:", result.error);
        alert("Failed to load stream details");
      }
    } catch (error) {
      console.error("Error loading stream details:", error);
      alert("Failed to load stream details");
    } finally {
      setIsLoadingDetails(false);
    }
  }, []);

  const handleCreateStream = useCallback(async () => {
    const gradeName = prompt("Enter grade (e.g., Grade 1, PP1, Playgroup):");
    if (!gradeName) return;

    const streamName = prompt("Enter stream name (e.g., North, Blue, Class A):");
    if (!streamName) return;

    const capacityStr = prompt("Enter stream capacity (optional):");
    const capacity = capacityStr ? parseInt(capacityStr, 10) : undefined;

    try {
      setIsCreating(true);
      const result = await createStreamAction(streamName, gradeName, capacity);
      if (result.success) {
        alert("Stream created successfully!");
        await loadStreams();
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error creating stream:", error);
      alert("Failed to create stream");
    } finally {
      setIsCreating(false);
    }
  }, [loadStreams]);

  return (
    <>
      <StreamsList
        streams={streams}
        isLoading={isLoadingStreams}
        onRefresh={loadStreams}
        onCreateStream={handleCreateStream}
        onViewStream={handleViewStream}
      />

      <StreamDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        stream={selectedStream}
        isLoading={isLoadingDetails}
      />
    </>
  );
}
